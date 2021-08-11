let MojangAPI = require('../lib/index');

let chai = require('chai');

chai.use( require('chai-as-promised') );

// This username and UUID is unlikely to change, given this is one of the "official" Mojang skin accounts.
// See http://minecraft.gamepedia.com/Mob_head#Mojang_skins
const USERNAME = 'MHF_Chicken';
const UUID = '92deafa9430742d9b00388601598d6c0';

// For namesToUuid test, second username:
const USERNAME2 = 'MHF_Cake';

describe('Mojang API', () => {
    let api;
    beforeEach(() => {
        api = new MojangAPI();
    });

    describe('uuidAt', () => {
        describe('throws an Error if', () => {
            async function testReject(...args) {
                await chai.expect(api.uuidAt(...args)).be.rejectedWith(Error);
            }

            it('username was not specified', async () => {
                await testReject();
            });

            it('username was not valid', async () => {
                await testReject(42);
            });

            it('date was not specified', async () => {
                await testReject(USERNAME);
            });

            it('date was not valid', async () => {
                await testReject(USERNAME, 'derp');
            });
        });

        describe('works when timestamp is a', () => {
            const TIMESTAMP = 1432789369;

            it('number', async () => {
                let resp = await api.uuidAt(USERNAME, TIMESTAMP);

                chai.expect(resp).to.have.property('id').and.equal(UUID);
                chai.expect(resp).to.have.property('name', USERNAME);
            });

            it('Date', async () => {
                let resp = await api.uuidAt(USERNAME, new Date(TIMESTAMP * 1000));
                    
                chai.expect(resp).to.have.property('id', UUID);
                chai.expect(resp).to.have.property('name', USERNAME);
            });
        });
    });

    describe('nameHistory', () => {
        describe('throws an Error if', () => {
            async function testReject(...args) {
                await chai.expect(api.nameHistory(...args)).be.rejectedWith(Error);
            }

            it('username was not specified', async () => {
                await testReject();
            });

            it('username was not valid', async () => {
                await testReject(42);
            });
        });

        it('produces correct results', async () => {
            let resp = await api.nameHistory(UUID);
            
            chai.expect(resp).to.be.instanceof(Array);
        });
    });

    describe('nameToUuid', () => {
        describe('throws an error if', () => {
            async function testReject(...args) {
                await chai.expect(api.nameToUuid(...args)).be.rejectedWith(Error);
            }

            it('names are not specified', async () => {
                await testReject();
            });

            it('names was not valid', async () => {
                await testReject(42);
            });
        });

        describe('works when names is a', async () => {
            it('string', async () => {
                let resp = await api.nameToUuid(USERNAME);

                chai.expect(resp).to.be.instanceof(Array);
            });

            it('single-element Array', async () => {
                let resp = await api.nameToUuid([USERNAME]);

                chai.expect(resp).to.be.instanceof(Array);
            });

            it('multi-element Array', async () => {
                let resp = await api.nameToUuid([USERNAME, USERNAME2]);

                chai.expect(resp).to.be.instanceof(Array);
            });
        });
    });

    describe('profile', async () => {
        describe('throws an Error if', async () => {
            async function testReject(...args) {
                await chai.expect(api.profile(...args)).be.rejectedWith(Error);
            }

            it('uuid was not specified', async () => {
                await testReject();
            });

            it('uuid was not valid', async () => {
                await testReject(42);
            });
        });

        it('produces correct results', async () => {
            let resp = await api.profile(UUID);
            
            chai.expect(resp).to.have.property('id', UUID);
            chai.expect(resp).to.have.property('name', USERNAME);
            chai.expect(resp).to.have.property('properties').and.to.be.instanceof(Array);
        });
    });
});