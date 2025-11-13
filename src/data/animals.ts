import { faker } from '@faker-js/faker'

const getAnimalName = (type: string): string => {
    const animalMethods: Record<string, () => string> = {
        'cat': () => faker.animal.cat(),
        'dog': () => faker.animal.dog(),
        'snake': () => faker.animal.snake(),
        'bear': () => faker.animal.bear(),
        'lion': () => faker.animal.lion(),
        'cetacean': () => faker.animal.cetacean(),
        'rabbit': () => faker.animal.rabbit(),
        'cow': () => faker.animal.cow(),
        'crocodile': () => faker.animal.crocodilia(),
        'horse': () => faker.animal.horse(),
        'insect': () => faker.animal.insect(),
        'bird': () => faker.animal.bird(),
    }

    const method = animalMethods[type.toLowerCase()]
    if (method && typeof method === 'function') {
        return method()
    }

    return `${type.charAt(0).toUpperCase() + type.slice(1)} ${faker.person.firstName()}`
}

export const getAnimals = async () => {
    await new Promise((res) => setTimeout(res, 800))

    const data = Array.from({ length: 100 }).map((_, index) => {
        const type = faker.animal.type()
        return {
            id: index + 1,
            type,
            title: getAnimalName(type),
            description: faker.lorem.sentences(),
            url: faker.internet.url(),
            image: faker.image.urlLoremFlickr({ category: 'animals', width: 600, height: 400 }),
        }
    })

    return data
}