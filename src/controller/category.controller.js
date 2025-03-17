const { query } = require("../database/pg")

exports.getAllCategory = async function (req, res) {
    try {
        const category = await query(`SELECT c.id AS category_id,
                c.name AS category_name, json_agg(json_build_object(
                        'id', p.id , 
                        'name', p.name, 
                        'price', p.price, 
                        'count', p.count
                    )) AS products
            FROM category c
            LEFT JOIN products p ON p.category_id = c.id
            GROUP BY c.name,c.id 
            ORDER BY c.id`)

        res.status(200).send({
            message: "Barcha kategoriyalar",
            data: category
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
}

exports.createCategory = async function (req, res) {
    try {
        const { name } = req.body

        const category = await query('INSERT INTO category(name) VALUES ($1) RETURNING *',
            [name]);

        res.status(201).send({
            message: "Yangi kategoriya yaratildi",
            data: category
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
}

exports.updateCategory = async function (req, res) {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ error: "Notogri ID" });
        }
        const { name } = req.body

        const category = await query(`
        UPDATE category SET name = $1 WHERE id = $2 RETURNING *`, [name, id]);


        if (!category || category.length === 0) {
            res.status(400).send({
                message: "Kategoriya topilmadi"
            })
        }

        res.status(200).send({
            message: "Kategoriya yangilandi",
            data: category
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
}

exports.deleteCategory = async function (req, res) {
   try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: "Notogri ID" });
    }
    const category = await query(`DELETE FROM category WHERE id = $1 RETURNING *`,[id])

    if (!category || category.length === 0){
        res.status(404).send({message:"Kategoriya topilmadi"})
    }

    res.status(204).send()
   } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
   }
}