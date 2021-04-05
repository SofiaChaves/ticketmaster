import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import WaitingList from "./waitingList"

global.fetch = jest.fn();

describe("waiting list component", () => {
    let expectedEmail, expectedPhone;
    let alreadyAddedText, fieldsMissingText;

    beforeEach(()=>{
        expectedEmail = "sofia@test.net";
        expectedPhone = "07100123456";
        alreadyAddedText = "You have already been added to the waiting list";
        fieldsMissingText = "Email and mobile number must be provided";
        fetch.mockClear();
    });

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

        expect(fetch).not.toHaveBeenCalled();

        const error = getByText(fieldsMissingText);
        expect(error).toBeVisible();
        expect(email).toBeVisible();
        expect(phone).toBeVisible();
        expect(submit).toBeVisible();
    });

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

        expect(fetch).not.toHaveBeenCalled();

        const error = getByText(fieldsMissingText);
        expect(error).toBeVisible();
        expect(email).toBeVisible();
        expect(phone).toBeVisible();
        expect(submit).toBeVisible();
    });

    test("success", async () => {

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

        expect(fetch).toHaveBeenCalledTimes(1);

        const successMessage = getByTestId("successMessage");
        expect(successMessage).toBeVisible();
        expect(email).not.toBeVisible();
        expect(phone).not.toBeVisible();
        expect(submit).not.toBeVisible();
  });

    test("already registered", async () => {

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

        expect(fetch).toHaveBeenCalledTimes(1);

        const error = getByText(alreadyAddedText);
        expect(error).toBeVisible();
        expect(email).toBeVisible();
        expect(phone).toBeVisible();
        expect(submit).toBeVisible();
  });
})