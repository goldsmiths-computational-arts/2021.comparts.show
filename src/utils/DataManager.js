// import MarkdownIt from "markdown-it";
import {csvParse} from "d3-dsv";
import {readFileSync} from "fs";
// const fs = require('fs')
// import { DATA_DIR } from "./Constants";

export default class DataManager {
    static getPosts = () => {
        const posts = csvParse(
            readFileSync(`${DATA_DIR}/posts.csv`, 'utf-8')
        )

        // let posts = 'HE'
        
        return posts
    }
}