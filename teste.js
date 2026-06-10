function reverse_word(word) {
    let reversed = ""
    for (const letter of word) {
        reversed = letter + reversed
    }
    return reversed
}

function is_palindrome(word) {
    return word == reverse_word(word)
}

function check_all_palindromes(arr) {

    for (const word of arr){
        if (is_palindrome(word) == false) {
            return false
        }
    }
    return true
}
console.log(check_all_palindromes(['racecar', 'noon', 'civic']))