import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'edu' },
    { id: 2, name: 'edu1' },
    { id: 3, name: 'edu2' },
  ];

  return response.json(users);
}