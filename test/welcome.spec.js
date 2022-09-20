import { Welcome } from "../src/components/welcome.js";

jest.mock('../lib/index.js'(()=>{}))

describe('Welcome', () => {
    it('debería ser una función', () => {
      expect(typeof Welcome).toBe('function');
    });

  });
