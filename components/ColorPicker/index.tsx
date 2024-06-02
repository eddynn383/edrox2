'use client'

import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import th from "@/styles/theme.module.scss"

const ColorPicker = () => {
    const [mainColor, setMainColor] = useState('#007bff'); // Default main color
    //   const router = useRouter();

    const handleColorChange = (newColor: any) => {
        setMainColor(newColor);

        //     // Update main color variable in globals.scss
        // //     const globalsScssFile = require.resolve('./globals.scss');
        // //     const updatedGlobalsScss = `
        // //       @import "${globalsScssFile}";

        // //       $main-color: ${newColor};
        // //    `;
        //     // require('fs').writeFileSync('./globals.scss', updatedGlobalsScss);

        //     // Redirect to the homepage to apply the updated color
        //     router.push('/');
        // console.log(newColor);
        // console.log(th.accentBrand400)
        // th.accentBrand400 = 'hsl(50, 50%, 50%)'
    };

    return (
        <div>
            <h1>Theme Color Picker</h1>
            <label htmlFor="main-color">Select Main Color:</label>
            <input
                id="main-color"
                type="color"
                defaultValue={mainColor}
                value={mainColor}
                onChange={(event) => handleColorChange(event.target.value)}
            />
        </div>
    );
};

export { ColorPicker };