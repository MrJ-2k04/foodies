import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
    await new Promise(res => setTimeout(res, 1000));
    // throw new Error("Failed to fetch meals");
    return db.prepare("SELECT * from meals").all();
}

export async function getMeal(slug) {
    return db.prepare('SELECT * from meals where slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const ext = meal.image.name.split(".").pop();
    const filename = `${meal.slug}.${ext}`;

    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (err) => {
        if (err) {
            throw new Error("Saving image failed");
        }
    });

    meal.image = `/images/${filename}`;
    db.prepare(`
        INSERT into meals 
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}