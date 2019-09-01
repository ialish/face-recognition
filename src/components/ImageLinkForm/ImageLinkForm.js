import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ inputChange, imageSubmit }) => {
	return (
		<div>
			<p className='f3'>
				This magic brain will detect faces in your pictures. Give it a try.
			</p>
			<div className='center'>
				<div className='pa4 br3 shadow-5 form center'>
					<input
						className='f4 pa2 w-70 center'
						type='text'
						onChange={inputChange}
					/>
					<button 
						className='f4 pv2 w-30 ph3 dib pointer grow white bg-light-purple'
						onClick={imageSubmit}	
					>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;