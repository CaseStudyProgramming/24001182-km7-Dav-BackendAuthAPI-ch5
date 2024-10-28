const ImageKit = require("imagekit")

//image kit init
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// image upload function
exports.imageUpload = async (file) => {  
    const uploadFile = await imagekit.upload({
        file: file.data,
        fileName: file.name,
    });
    return uploadFile?.url; 
};

// image delete function
// exports.imageDelete = async (fileId) => {
//     try {
//         await imagekit.deleteFile(fileId);
//     } catch (error) {
//         console.error("Error deleting image from ImageKit:", error);
//     }
// };

