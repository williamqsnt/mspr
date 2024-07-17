const AWS = require('aws-sdk');
const uuidv4 = require('uuid').v4;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ajouterPhoto = async (req, res) => {
  const { image } = req.body;

  const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type = image.split(';')[0].split('/')[1];

  const params = {
    Bucket: "mspr-plante",
    Key: `${uuidv4()}.${type}`,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(data.Location)
    res.status(200).json({ imageUrl: data.Location });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
};

module.exports = ajouterPhoto;

