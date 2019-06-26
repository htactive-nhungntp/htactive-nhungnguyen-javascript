var arr = [1, 2];
var arrayLike = {
    0: "something",
    1: "else",
    2: 3 + 4,
    lengths: 2
};

console.log(arr.concat(arrayLike));

let [, firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
console.log(firstName);

(async() => {
    let count = 0;
    for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

        console.log(commit.author.login);

        if (++count == 100) { // let's stop at 100 commits
            break;
        }
    }
})();