import express from 'express'
import slides from '../slides'

const router = express.Router();

router.get('/', function (req, res, next) {

    res.send('Google Api Start');
});

router.get('/create', async (req, res, next) => {
    const authKey = await slides.auth.getToken();
    const presentationID = await slides.createPresentation(authKey, 'Created Slider');
    await slides.createSlide(authKey, presentationID, 'newSlide', text, images)

    res.send(`Presentation <a href="https://docs.google.com/presentation/d/${presentationID}/" target="_blank"> link </a>`)
});

/* GET home page. */
router.get('/auth', async (req, res, next) => {
    const presentationsApi = await slides.auth.getToken();

    if (presentationsApi.err) {
        res.send(JSON.stringify(err))
    } else {
        res.send(`Token is ok`)
    }

});

export default router;

const images = [
    'https://turtle-files.imgix.net/prod/uploads/27513508638083588130571677138944/L7BPsnlhLh5CaLHoKUfAX4B56Q8M5pNECWnJJaUMit4=-image-1.jpg',
    'https://turtle-files.imgix.net/prod/uploads/27513508638083588130571677138944/hDt47FcfhxWkGGlXUiu1XaXLUxQALwuMx1XiPqKwBTA=-image-2.jpg',
    'https://turtle-files.imgix.net/prod/uploads/27513508638083588130571677138944/nKixLvlMl0ctx0ULdmoDHzEJYEV39vANIc5AAPx4PFw=-IMAGE-3.png'
]

const text = {
    title: {
        index: 1,
        text: "Level 5 Autonomy Is Dead",
        rows: 1,
        fontSize: 18,
        PosX: 5,
        PosY: 5
    },
    description: {
        index: 2,
        text: "Cities of the future might not need level 5 autonomy to deliver the future of mobility",
        rows: 2,
        fontSize: 14,
        PosX: 5,
        PosY: 50
    },
    longdescription : {
        index: 3,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        rows: 6,
        fontSize: 12,
        PosX: 5,
        PosY: 120
    }
}
