import { render, screen } from "@testing-library/react"
import { test, vi, expect } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { NewSubscription } from "../pages/NewSubscription"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { generateRandomSubscription } from "../utils/generateMockData"

const renderNewSubscription = () => {
    const onSaveMock = vi.fn();

    render(
        <BrowserRouter>
            <NewSubscription onSave={onSaveMock} key={1}/>
        </BrowserRouter>
    )

    return { onSaveMock }
}

test("deve ser possivel renderizar a tela de cadastro de assinatura", () => {
    renderNewSubscription();
    
    expect(screen.getByText("Nome do serviço")).toBeInTheDocument();
    expect(screen.getByText("Preço mensal (R$)")).toBeInTheDocument();
    expect(screen.getByText("Categoria")).toBeInTheDocument();
    
})

test("deve ser possivel adicionar uma assinatura", async () => {
    const { onSaveMock } = renderNewSubscription();
    const data = generateRandomSubscription()

    await userEvent.type(screen.getByLabelText("Nome do serviço"), data.name);
    await userEvent.type(screen.getByLabelText("Preço mensal (R$)"), data.price.toString());
    await userEvent.selectOptions(screen.getByLabelText("Categoria"), data.category);
    await userEvent.click(screen.getByRole("button", { name: /Salvar assinatura/i }));

    expect(onSaveMock).toHaveBeenCalledWith(
        expect.objectContaining({
            name: data.name,
            price: data.price,
            category: data.category,
            
        })
    )
})

test("Deve disparar erro caso o nome não seja preenchido", async () => {
    const { onSaveMock } = renderNewSubscription();
    
    const data = generateRandomSubscription();
    
    await userEvent.type(screen.getByLabelText("Preço mensal (R$)"), data.price.toString());
    await userEvent.selectOptions(screen.getByLabelText("Categoria"), data.category);
    await userEvent.click(screen.getByRole("button", { name: /Salvar assinatura/i }));

    expect(onSaveMock).not.toHaveBeenCalled();
    expect(screen.getByText(/Preencha os campos corretamente!/i)).toBeInTheDocument()
})

test("Deve disparar erro caso o preço não seja preenchido", async () => {
    const { onSaveMock } = renderNewSubscription();
    
    const data = generateRandomSubscription();
    
    await userEvent.type(screen.getByLabelText("Nome do serviço"), data.name);
    await userEvent.selectOptions(screen.getByLabelText("Categoria"), data.category);
    await userEvent.click(screen.getByRole("button", { name: /Salvar assinatura/i }));

    expect(onSaveMock).not.toHaveBeenCalled();
    expect(screen.getByText(/Preencha os campos corretamente!/i)).toBeInTheDocument()
})

