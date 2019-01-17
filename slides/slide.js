
import { google } from 'googleapis';

const createSlide = (auth, presentationId, pageId, text, images) => {
	const slidesService = google.slides({ version: 'v1', auth });

	return new Promise((resolve, reject) => {
		let requests = [{
			createSlide: {
				objectId: pageId,
				insertionIndex: '0',
				slideLayoutReference: {
					predefinedLayout: 'BLANK',
				}
			}
		}];

		const title = createText({ ...text.title, pageId });
		const description = createText({ ...text.description, pageId });
		const longDescriptiomn = createText({ ...text.longdescription, pageId });
		const image = images.map((image, index) => createImage(pageId, index + 1, image, index));

		requests = requests.concat(title, description, longDescriptiomn, image);


		return slidesService.presentations.batchUpdate({
			presentationId,
			resource: {
				requests,
			},
		}, (err, res) => {
			console.log(err);
			resolve(res);
		});
	})
}

const createImage = (pageId, index, url, step) => ({
	createImage: {
		objectId: `MyImageBox_${index}`,
		elementProperties: {
			pageObjectId: pageId,
			transform: {
				scaleX: 1,
				scaleY: 1,
				translateX: 280 + 50 * step,
				translateY: 50 * step,
				unit: 'PT',
			},
			size: {
				height: { magnitude: 250, unit: 'PT' },
				width: { magnitude: 250, unit: 'PT' },
			}
		},
		url,
	}
})

const createText = ({ index, text, rows, fontSize, PosX, PosY, pageId }) => [
	{
		createShape: {
			objectId: `MyTitleBox_${index}`,
			shapeType: 'TEXT_BOX',
			elementProperties: {
				pageObjectId: pageId,
				size: {
					height: { magnitude: 1.5 * rows * fontSize, unit: 'PT' },
					width: { magnitude: 250, unit: 'PT' },
				},
				transform: {
					scaleX: 1,
					scaleY: 1,
					translateX: PosX,
					translateY: PosY,
					unit: 'PT',
				},
			},
		}
	}, {
		insertText: {
			objectId: `MyTitleBox_${index}`,
			insertionIndex: 0,
			text,
		}
	},
	{
		updateTextStyle: {
			objectId: `MyTitleBox_${index}`,
			style: {
				fontSize: {
					magnitude: fontSize,
					unit: 'PT'
				}
			},
			fields: 'fontSize',
		}
	}
]

export default createSlide;

