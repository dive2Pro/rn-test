import React from 'react'
import {ActionSheetIOS as mockedActionSheetIOS} from 'react-native'
import TestComp from './TestComp'
import {waitForElement, render, fireEvent} from 'react-native-testing-library'

jest.mock('ActionSheetIOS', () => {
    return {
        showActionSheetWithOptions: jest.fn().mockImplementation((option, cb) => {
            cb(0)
        })
    }
})

jest.mock('./native')


describe("TestComp", () => {
    it('init', () => {
        render(<TestComp/>)
    })

    it('first : not have permission', async () => {
        const {debug, getByTestId} = render(<TestComp/>)
        const uploadBtn = getByTestId('upload')

        const mockedRequestCameraAuthCation = jest.fn();
        const mockedNativeUtils = require('./native').default;

        mockedNativeUtils.requestCameraAuthcation = mockedRequestCameraAuthCation.mockReturnValue("cancel")

        mockedNativeUtils.requestFakeData = jest.fn().mockReturnValue([{
            name: 'blabla'
        }])

        fireEvent.press(uploadBtn)
        await waitForElement(() => {
            expect(mockedRequestCameraAuthCation).toHaveBeenCalled()
        })


    })
    it('second: have permission', async () => {
        const {debug, getByTestId} = render(<TestComp/>)
        const uploadBtn = getByTestId('upload')

        const mockedRequestCameraAuthCation = jest.fn();
        const mockedNativeUtils = require('./native').default;

        mockedNativeUtils.requestCameraAuthcation = mockedRequestCameraAuthCation.mockReturnValue("pass")

        mockedNativeUtils.requestFakeData = jest.fn().mockReturnValue([{
            name: 'blabla'
        }])

        fireEvent.press(uploadBtn)
        await waitForElement(() => {
            expect(mockedRequestCameraAuthCation).toHaveBeenCalled()
            getByTestId('blabla')
        })


    })
})
