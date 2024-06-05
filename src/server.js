import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (e) {
      res.status(500).json({
        message: 'Ups something went wrong...',
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({
          message: `Not found`,
        });
      }
      res.status(200).json({
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (e) {
      res.status(404).json({
        message: `Not found`,
      });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(3000, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};
