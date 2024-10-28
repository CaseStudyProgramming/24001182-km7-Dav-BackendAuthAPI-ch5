const ImageKit = require('imagekit');

// Initialize ImageKit with credentials
const imagekit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Function to upload an image to ImageKit
exports.imageUpload = async file => {
	const uploadFile = await imagekit.upload({
		file: file.data, // Ensure this is the correct file data
		fileName: file.name,
	});
	return uploadFile?.url; // Return the URL of the uploaded image
};