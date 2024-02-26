'use server'

import { redirect } from "next/navigation";
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache";

function isFalsy(item) {
    return !item || item.trim() === "";
}

export async function shareMeal(prevState, formData) {

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    if (
        isFalsy(meal.title) ||
        isFalsy(meal.summary) ||
        isFalsy(meal.instructions) ||
        isFalsy(meal.creator) ||
        isFalsy(meal.creator_email) ||
        !meal.creator_email.includes("@") ||
        !meal.image || meal.image.size === 0
    ) {
        return {
            type: "error",
            message: "Invalid input"
        };
    }

    await saveMeal(meal);
    revalidatePath("/meals");
    redirect("/meals");
}