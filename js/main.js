function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = ['Артём', 'Ольга', 'Мария', 'Иван', 'Дмитрий', 'Александр', 'Елена'];

function generateComment(id) {
  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: `${messages[getRandomInt(0, messages.length - 1)]} ${Math.random() > 0.5 ? messages[getRandomInt(0, messages.length - 1)] : ''}`.trim(),
    name: names[getRandomInt(0, names.length - 1)]
  };
}

function generateComments() {
  const comments = [];
  const commentCount = getRandomInt(0, 30);
  const usedIds = new Set();

  for (let i = 0; i < commentCount; i++) {
    let commentId;
    do {
      commentId = getRandomInt(100, 999);
    } while (usedIds.has(commentId));
    usedIds.add(commentId);

    comments.push(generateComment(commentId));
  }

  return comments;
}

function generatePhotos(count) {
  const photos = [];

  for (let i = 1; i <= count; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии ${i}`,
      likes: getRandomInt(15, 200),
      comments: generateComments()
    });
  }

  return photos;
}

const photosArray = generatePhotos(25);

console.log(photosArray);
