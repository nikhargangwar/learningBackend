const services = require('../src/services');
const db = require('../database/models');

describe('get all task from db', () => {
    it('should return all tasks', async () => {
        jest.spyOn(db.Task, 'findAll').mockResolvedValue([{
            id: 1,
            title: 'task1',
            isCompleted: false
        },
        {
            id: 2,
            title: 'task2',
            isCompleted: false
        }]);

        const result = await services.getAllTaskFromDb();
        expect(result).toEqual([{
            id: 1,
            title: 'task1',
            isCompleted: false
        },
        {
            id: 2,
            title: 'task2',
            isCompleted: false
        }]);
    });
});

describe('get todo with id', () => {
    it('should return a todo wit id', async () => {
        jest.spyOn(db.Task, 'findAll').mockResolvedValue([{
            id: 1,
            title: 'task1',
            isCompleted: false
        },
        {
            id: 2,
            title: 'task2',
            isCompleted: false
        }]);

        const mockreq = { where: { id: 1 } };

        const result = await services.getAllTaskFromDb(mockreq);
        expect(result).toEqual([{
            id: 1,
            title: 'task1',
            isCompleted: false
        },
        {
            id: 2,
            title: 'task2',
            isCompleted: false
        }]);
    });
});

describe('post todo ', () => {
    it('should post a todo with', async () => {
        jest.spyOn(db.Task, 'create').mockResolvedValue({
            id: 3,
            title: 'task3',
            isCompleted: false
        });

        const mockreq = {
            body: {
                id: 3,
                title: 'task3',
                isCompleted: false
            }
        };

        const result = await services.postTodoToDb(mockreq);
        expect(result).toEqual({
            id: 3,
            title: 'task3',
            isCompleted: false
        });
    });
});

describe('delete todo ', () => {
    it('should delete a todo with', async () => {
        jest.spyOn(db.Task, 'destroy').mockResolvedValue(1);

        const mockreq = {
            params: {
                id: 2,
            }
        };

        const result = await services.deleteTodoFromDb(mockreq);
        expect(result).toEqual(1);
    });
});


describe('update todo ', () => {
    it('should update a todo with', async () => {
        jest.spyOn(db.Task, 'update').mockResolvedValue([1]);

        const mockreq = {
            body: { title: 'tasknext' }, params: {
                id: 2,
            }
        };

        const result = await services.patchTodoByIdFromDb(mockreq);
        expect(result).toEqual([1]);
    });
});
