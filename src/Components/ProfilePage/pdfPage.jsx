import {useState} from "react";
import { saveAs } from "file-saver";
import axios from "axios";

function pdfPage() {
const [pdfData, setpdfData] = useState({})
const handleChange= () =>{

}
return <div>

<input type="text" placeholder="name" name="name" onChange={handleChange}"

  </div>;
}

export default pdfPage;
