function isStringMaxLength(str, maxLength) {
  return str.length<= maxLength;
}
console.log(isStringMaxLength('проверяемая строка', 20));
console.log(isStringMaxLength('проверяемая строка', 18));
console.log(isStringMaxLength('проверяемая строка', 10));

function isPalindrome(str) {
  const normStr=str.toLowerCase().replaceAll(' ', '');
  const reversedStr= normStr.split('').reverse().join('');
  return normStr=== reversedStr;
}
console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл'));

