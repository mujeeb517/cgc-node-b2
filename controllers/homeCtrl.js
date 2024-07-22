class HomeCtrl {

    root(req, res) {
        res.status(200);
        res.send('Hello Express JS');
    }

    health(req, res) {
        res.status(200);
        res.json({ status: 'Up' });
    }
}

module.exports = new HomeCtrl();

// function root(req, res) {
//     res.status(200);
//     res.send('Hello Express JS');
// }

// function health(req, res) {
//     res.status(200);
//     res.json({ status: 'Up' });
// }

// module.exports = {
//     root: root,
//     health: health
// };