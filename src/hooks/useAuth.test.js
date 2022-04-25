import useAuth from './useAuth';
import { render } from '@testing-library/react'

let mockIsAuth = false
jest.mock('./useAuth', () => {
    return jest.fn(() => ({
       isAuth: mockIsAuth
    }))
})
test('can show logged in message', () => {
    mockIsAuth = true
    const { getByText } = render(<useAuth/>)
    expect(getByText('Logged In')).toBeTruthy()
})