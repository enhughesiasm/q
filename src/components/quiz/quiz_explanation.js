import React from 'react';

const QuizExplanation = () => (
	<article className='message is-info' style={{ marginTop: '2rem' }}>
		<div className='message-header'>
			<p>What is this?</p>
		</div>
		<div className='message-body'>
			This is for <strong>live interactive experiences</strong>.
			<p>
				If you&apos;re attending a live session, enter your{' '}
				<strong>name</strong> and the <strong>entry word</strong> above,
				and enjoy!
			</p>
		</div>
	</article>
);

export default QuizExplanation;
