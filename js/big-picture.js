const fullViewContainer = document.querySelector('.big-picture');
const fullViewImage = fullViewContainer.querySelector('.big-picture__img img');
const likeCounter = fullViewContainer.querySelector('.likes-count');
const commentCounter = fullViewContainer.querySelector('.comments-count');
const commentList = fullViewContainer.querySelector('.social__comments');
const imageDescription = fullViewContainer.querySelector('.social__caption');
const commentStatusBlock = fullViewContainer.querySelector('.social__comment-count');
const loadMoreButton = fullViewContainer.querySelector('.comments-loader');
const closeButton = fullViewContainer.querySelector('.big-picture__cancel');
const maxCommentsPerBatch = 5;

let totalComments = [];
let loadedCommentCount = 0;

function displayComments() {
  const newComments = totalComments.slice(loadedCommentCount, loadedCommentCount + maxCommentsPerBatch);

  newComments.forEach((comment) => {
    const listItem = document.createElement('li');
    listItem.classList.add('social__comment');

    listItem.innerHTML = `
      <img
        class='social__picture'
        src='${comment.avatar}'
        alt='${comment.name}'
        width='35' height='35'>
      <p class='social__text'>${comment.message}</p>
    `;
    commentList.appendChild(listItem);
  });

  loadedCommentCount += newComments.length;

  commentStatusBlock.textContent = `${loadedCommentCount} из ${totalComments.length} комментариев`;

  if (loadedCommentCount >= totalComments.length) {
    loadMoreButton.classList.add('hidden');
  }
}

function showFullView(photoData) {
  fullViewImage.src = photoData.url;
  fullViewImage.alt = photoData.description;
  likeCounter.textContent = photoData.likes;
  commentCounter.textContent = photoData.comments.length;
  imageDescription.textContent = photoData.description;

  commentList.innerHTML = '';
  fullViewImage.className = '';

  // Применяем эффект, если указан
  if (photoData.effect && photoData.effect !== 'none') {
    fullViewImage.classList.add(`effects__preview--${photoData.effect}`);
  }

  totalComments = photoData.comments;
  loadedCommentCount = 0;

  displayComments();

  if (totalComments.length > 0) {
    commentStatusBlock.classList.remove('hidden');
    if (totalComments.length > maxCommentsPerBatch) {
      loadMoreButton.classList.remove('hidden');
    } else {
      loadMoreButton.classList.add('hidden');
    }
  } else {
    commentStatusBlock.classList.add('hidden');
    loadMoreButton.classList.add('hidden');
  }

  fullViewContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', hideFullView);
  document.addEventListener('keydown', handleEscapePress);
}

function hideFullView() {
  fullViewContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', hideFullView);
  document.removeEventListener('keydown', handleEscapePress);
}

function handleEscapePress(event) {
  if (event.key === 'Escape') {
    hideFullView();
  }
}

loadMoreButton.addEventListener('click', displayComments);

export { showFullView };
