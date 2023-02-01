const services = require('../src/services')
const controller = require('../src/controllers');


describe('getAllTasks', () => {
  it('should return all tasks', async () => {
    jest.spyOn(services, 'getAllTaskFromDb').mockResolvedValue([{
      id: 1,
      title: 'task1',
      isCompleted: false
    },
    {
      id: 2,
      title: 'task2',
      isCompleted: false
    }]);
    const mockreq = {};
    const mockres = {
      send: jest.fn()
    };
    await controller.getAllTodos(mockreq, mockres);
    expect(mockres.send).toHaveBeenCalledWith([{
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

describe('get task by id', () => {
  it('should return task with given id', async () => {
    jest.spyOn(services, 'getTodoFromDb').mockResolvedValue({
      id: 1,
      title: 'task1',
      isCompleted: false
    });
    const mockreq = {params: {
      id: 1
    }};
    const mockres = {
      send: jest.fn()
    };
    await controller.getTodosById(mockreq, mockres);
    expect(mockres.send).toHaveBeenCalledWith({
      id: 1,
      title: 'task1',
      isCompleted: false
    });
  });
});

describe('post a todo', () => {
  it('should post a task', async () => {
    jest.spyOn(services, 'postTodoToDb').mockResolvedValue({
      id: 1,
      title: 'task1',
      isCompleted: false
    });
    const mockreq = {body: {
      title: 'task1'
    }};
    const mockres = {
      send: jest.fn()
    };
    await controller.postTodo(mockreq, mockres);
    expect(mockres.send).toHaveBeenCalledWith({
      id: 1,
      title: 'task1',
      isCompleted: false
    });
  });
});

describe('delete a todo', () => {
  it('should delete a task by id', async () => {
    jest.spyOn(services, 'deleteTodoFromDb').mockResolvedValue({
      id: 1,
      title: 'task1',
      isCompleted: false
    });
    const mockreq = {params: {
      id: 1
    }};
    const mockres = {
      json: jest.fn()
    };
    await controller.deleteTodo(mockreq, mockres);
    expect(mockres.json).toHaveBeenCalledWith({message:"item deleted"});
  });
});

describe('update a todo', () => {
  it('should update a task by id', async () => {
    jest.spyOn(services, 'patchTodoByIdFromDb').mockResolvedValue({
      id: 1,
      title: 'task1',
      isCompleted: false
    });
    const mockreq = {body: {
      title:'task2'
    },params:{
      id:1}};
    const mockres = {
      json: jest.fn()
    };
    await controller.patchTodoById(mockreq, mockres);
    expect(mockres.json).toHaveBeenCalledWith({message:"item updated"});
})});