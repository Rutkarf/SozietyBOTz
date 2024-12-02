const { MessageEmbed } = require('discord.js');
const pingCommand = require('../commands/general/ping');
const balanceCommand = require('../commands/economy/balance');
const characterCommand = require('../commands/rpg/character');

// Mock pour le modèle User
jest.mock('../models/User', () => ({
  findOne: jest.fn()
}));

// Mock pour le modèle Character
jest.mock('../models/Character', () => ({
  findOne: jest.fn()
}));

describe('Command Tests', () => {
  let message;

  beforeEach(() => {
    message = {
      channel: {
        send: jest.fn()
      },
      author: {
        id: '123456789',
        username: 'TestUser'
      },
      reply: jest.fn()
    };
  });

  test('ping command should reply with pong', async () => {
    await pingCommand.execute(message);
    expect(message.channel.send).toHaveBeenCalledWith('Pong!');
  });

  test('balance command should show user balance', async () => {
    const mockUser = { balance: 100 };
    require('../models/User').findOne.mockResolvedValue(mockUser);

    await balanceCommand.execute(message);
    expect(message.reply).toHaveBeenCalledWith(expect.stringContaining('100'));
  });

  test('character command should show character info', async () => {
    const mockCharacter = {
      level: 5,
      experience: 250,
      skills: {
        communication: 3,
        participation: 2,
        leadership: 1,
        creativity: 4
      }
    };
    require('../models/Character').findOne.mockResolvedValue(mockCharacter);

    await characterCommand.execute(message);
    expect(message.channel.send).toHaveBeenCalledWith(expect.objectContaining({
      embeds: [expect.any(MessageEmbed)]
    }));
  });
});
