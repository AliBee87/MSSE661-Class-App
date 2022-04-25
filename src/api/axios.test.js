import axios from 'axios';

jest.mock('axios');

describe('Test Axios', () => {
    describe('getResource', () => {
        describe('with success', () => {
            const url = 'http://test-url.com';
            const onComplete = jest.fn();
            const data = {};

            beforeEach(() => {
                axios.get.mockResolvedValue(data);
            });

            it('should call axios get with given url', () => {
                getResource(url, onComplete);
                expect(axios.get).toBeCalledWith(url);
            });

            it('should call onComplete callback with response', async () => { // do not forget 'async'
                await getResource(url, onComplete); // notice the 'await' because onComplete callback is called in '.then'
                expect(onComplete).toBeCalledWith(data);
            });
        });
    });
});