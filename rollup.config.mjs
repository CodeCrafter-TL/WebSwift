/** @type {import('rollup').RollupOptions} */
/** 
 * @type {import('@rollup/plugin-terser').terser}
 */
import terser from '@rollup/plugin-terser'
export default {
    input: "./dist/main.js",
    output: [
        {
            file: "./dist/webswift.min.js",
            format: "iife",
            name: "WebSwift",
            compact: true,
            plugins: [terser()]
        },
        {
            file: "./dist/webswift.js",
            format: "iife",
            name: "WebSwift",
            compact: true,
            plugins:[terser({
                // mangle:{
                //     eval:true
                // },
                format:{
                    semicolons:false
                }
            })]
        }
    ],
}