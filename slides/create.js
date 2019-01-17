
import { google } from 'googleapis';

const createPresentation = (auth, title) => {
    const slidesService = google.slides({ version: 'v1', auth });

    return new Promise((resolve, reject) => {
        slidesService.presentations.create({
            title,
        }, (err, presentation) => {
            if (err) {
                reject(err)
            } else {
                resolve(presentation.data.presentationId);
            }
        });
    });
}

export default createPresentation;
