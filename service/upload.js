const fs = require('fs');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { ApolloError } = require('apollo-server');

const uploadPhoto = async (createReadStream, filename) => {

    const stream = createReadStream();

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    });

    return new Promise((resolve, reject) => {
        const val = uuidv4();

        // Uploading files to the bucket
        s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: `${val}-${filename}`, // File name you want to save as in S3
            Body: stream
        }, function(err, data) {
            if (err) {
                throw err;
            }
            if (data) {
                console.log(`File uploaded successfully. ${data.Location}`);
                return resolve(data);
            }

        });
    })
}

const createImage = async (parent, args, { prisma }) => {
    try {

        const file = await args.file
        const { createReadStream, filename } = file
        console.log(args)

        var img = null
        
        await uploadPhoto(createReadStream, filename).then(data => {
            img = data
        })

        if (img != null) {
            const image = await prisma.images.create({
                data: {
                    identifier: img.Key,
                    url: img.Location,
                    caption: args.caption,
                    users: {
                        connect: {
                            pkuser: args.pkuser
                        }
                    }
                }
            })
            return image
        }
        else {
            return new ApolloError("Image not uploaded")
        }
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const addImageToExperienceHelper = async(prisma, pkexperience, Key, Location, caption, pkuser) => {
    const experience_image = await prisma.experience_images.create({
        data: {
            experiences: {
                connect: {
                    pkexperience: pkexperience
                }
            },
            images: {
                create: {
                    identifier: Key,
                    url: Location,
                    caption: caption,
                    users: {
                        connect: {
                            pkuser: pkuser
                        }
                    }
                }
            }
        }
    })
    console.log(experience_image)
}

module.exports = {
    uploadPhoto,
    createImage,
    addImageToExperienceHelper
}