import faker from 'faker'

const data = []
const count = 20

let range = n => Array.from(Array(n).keys())

// for(i in range(count)){
//     data.push({
//         id: faker.random.uuid(),
//         user: {
//             name: 16520000 + i*100
//         },
//         subject: faker.lorem.words(5)
//     })
// }

data.push({
    id: 66666666666,
    user: {
        name: 16520364
    },
    subject: "hien"
})
data.push({
    id: 6666666666600,
    user: {
        name: 16520395
    },
    subject: "hieu"
})
data.push({
    id: 666666645666600,
    user: {
        name: 16520354
    },
    subject: "hau"
})
export default data