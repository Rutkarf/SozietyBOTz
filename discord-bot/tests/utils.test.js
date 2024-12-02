const { createBasicEmbed, createCharacterEmbed } = require('../utils/embedBuilder');
const { connect, close } = require('../utils/database');

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    close: jest.fn()
  }
}));

describe('Utility Function Tests', () => {
  test('createBasicEmbed should return a MessageEmbed', () => {
    const embed = createBasicEmbed('Test Title', 'Test Description');
    expect(embed.title).toBe('Test Title');
    expect(embed.description).toBe('Test Description');
  });

  test('createCharacterEmbed should return a MessageEmbed with character info', () => {
    const character = {
      level: 5,
      experience: 250,
      skills: {
        communication: 3,
        participation: 2,
        leadership: 1,
        creativity: 4
      },
      power: 10
    };
    const user = {
      username: 'TestUser',
      displayAvatarURL: () => 'http://example.com/avatar.png'
    };

    const embed = createCharacterEmbed(character, user);
    expect(embed.title).toBe('Personnage de TestUser');
    expect(embed.fields).toHaveLength(7); // 5 skills + level + experience
  });

  test('database connect should call mongoose.connect', async () => {
    await connect();
    expect(require('mongoose').connect).toHaveBeenCalled();
  });

  test('database close should call mongoose.connection.close', async () => {
    await close();
    expect(require('mongoose').connection.close).toHaveBeenCalled();
  });
});
