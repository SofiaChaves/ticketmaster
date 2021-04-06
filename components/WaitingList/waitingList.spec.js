import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import WaitingList from "./waitingList"

global.fetch = jest.fn();

describe("waiting list component", () => {
    let expectedEmail, expectedPhone;
    let alreadyAddedText, fieldsMissingText;

    //setting up test subjects
    beforeEach(()=>{
        expectedEmail = "sofia@test.net";
        expectedPhone = "07100123456";
        alreadyAddedText = "You have already been added to the waiting list";
        fieldsMissingText = "Email and mobile number must be provided";
        fetch.mockClear();
    });

    //test for missing email when submitting form
    test("missing email", async () => {
        const {getByText, getByTestId} = render(<WaitingList />);
        const submit = getByTestId("submit");
        const email = getByTestId("email");
        const phone = getByTestId("phone");

        await act(async () => {
            fireEvent.change(email, {target: {value: ""}});
            fireEvent.change(phone, {target: {value: expectedPhone}});
            fireEvent.click(submit);
        })

        //verifying that any api call was made
        expect(fetch).not.toHaveBeenCalled();

        //making sure it is displaying error message
        const error = getByText(fieldsMissingText);
        expect(error).toBeVisible();
        expect(email).toBeVisible();
        expect(phone).toBeVisible();
        expect(submit).toBeVisible();
    });

    //test for missing phone field when submitting form
    test("missing phone", async () => {

        const {getByText, getByTestId} = render(<WaitingList />);
        const submit = getByTestId("submit");
        const email = getByTestId("email");
        const phone = getByTestId("phone");

        await act(async () => {
            fireEvent.change(email, {target: {value: expectedEmail}});
            fireEvent.change(phone, {target: {value: ""}});
            fireEvent.click(submit);
        })
        
        //verifying that any api call was made
        expect(fetch).not.toHaveBeenCalled();

        //making sure it is displaying error message
        const error = getByText(fieldsMissingText);
        expect(error).toBeVisible();
        expect(email).toBeVisible();
        expect(phone).toBeVisible();
        expect(submit).toBeVisible();
    });

    //test for in case of success
    test("success", async () => {

        //fetch mock for 200
        fetch.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                status: "success"
            })
        }));

        const {getByTestId} = render(<WaitingList />);
        const submit = getByTestId("submit");
        const email = getByTestId("email");
        const phone = getByTestId("phone");

        await act(async () => {
            fireEvent.change(email, {target: {value: expectedEmail}});
            fireEvent.change(phone, {target: {value: expectedPhone }});
            fireEvent.click(submit);
        })

        //verifying that only 1 api call was made
        expect(fetch).toHaveBeenCalledTimes(1);

        //making sure it is displaying success message
        const successMessage = getByTestId("successMessage");
        expect(successMessage).toBeVisible();
        expect(email).not.toBeVisible();
        expect(phone).not.toBeVisible();
        expect(submit).not.toBeVisible();
  });

    //email already exists test
    test("already registered", async () => {

        //fetch mock for 400
        fetch.mockImplementationOnce(() => Promise.resolve({
            status: 400,
            json: () => Promise.resolve({
                status: "error",
                message: alreadyAddedText
                  })
        }));

        const {getByTestId, getByText} = render(<WaitingList />);
        const submit = getByTestId("submit");
        const email = getByTestId("email");
        const phone = getByTestId("phone");

        await act(async () => {
            fireEvent.change(email, {target: {value: "alreadysubscribed@test.test"}});
            fireEvent.change(phone, {target: {value: expectedPhone}});
            fireEvent.click(submit);
        })

        //verifying that only 1 api call was made
        expect(fetch).toHaveBeenCalledTimes(1);

        //making sure it is displaying error message
        const error = getByText(alreadyAddedText);
        expect(error).toBeVisible();
        expect(email).toBeVisible();
        expect(phone).toBeVisible();
        expect(submit).toBeVisible();
  });
})