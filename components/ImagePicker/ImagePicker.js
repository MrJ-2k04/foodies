"use client"

import { useRef, useState } from "react";
import classes from "./ImagePicker.module.css";
import Image from "next/image";

export default function ({ label, name }) {
    const input = useRef();
    const [image, setImage] = useState(null);

    const handleClick = () => {
        input.current.click();
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setImage(null);
            return;
        }
        const fr = new FileReader();
        fr.onload = () => {
            setImage(fr.result);
        }
        fr.readAsDataURL(file);
    }
    return <div className={classes.picker}>
        <label htmlFor="inp">{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!image && <p>No image picked to preview</p>}
                {image && <Image
                    src={image}
                    alt="Image picked by user"
                    fill
                />}
            </div>
            <input
                className={classes.input}
                type="file"
                id="inp"
                accept="image/png, image/jpeg"
                name={name}
                ref={input}
                onChange={handleFileChange}
                required
            />
            <button onClick={handleClick} className={classes.button} type="button">
                Pick an Image
            </button>
        </div>
    </div>
}