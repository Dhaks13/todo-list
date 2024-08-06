import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'tasks.json');

function readData() {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  console.log(`Received a ${req.method} request`);
  const { method } = req;

  switch (method) {
    case 'GET':
      const data = readData();
      res.status(200).json(data);
      break;
    case 'POST':
      const newTask = req.body;
      const currentData = readData();
      newTask.id = currentData.length ? currentData[currentData.length - 1].id + 1 : 1;
      currentData.push(newTask);
      writeData(currentData);
      res.status(201).json(newTask);
      break;
    case 'PUT':
      const updatedTask = req.body;
      const allData = readData();
      const index = allData.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        allData[index] = updatedTask;
        writeData(allData);
        res.status(200).json(updatedTask);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
      break;
    case 'DELETE':
      const { id } = req.query;
      const dataAfterDelete = readData().filter(task => task.id !== parseInt(id));
      writeData(dataAfterDelete);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
