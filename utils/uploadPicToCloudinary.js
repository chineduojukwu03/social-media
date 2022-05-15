import axios from "axios";

const uploadPic = async (media)=>{
    try {
        const form = new FormData()
        form.append('file',media)
        form.append('upload preset','social media')
        form.append('cloud_name', 'ojukwuchinedu')

        const res=await axios.post(process.env.CLOUDINAEY_URL,form)
        return res.data.url;

        
    } catch (error) {
        
    }

}

export default uploadPic;