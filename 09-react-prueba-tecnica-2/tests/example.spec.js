// @ts-check
import { test, expect } from '@playwright/test'

// Test E2E (Test de renderizado)
// Crear test para cambiar imagen
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
const LOCALHOST_URL = 'http://localhost:5173/09-react-prueba-tecnica-2/dist'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img').nth(0)

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  // Las promesas llevan await
  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
})

test('app changes fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const txt1 = await page.getByRole('paragraph')
  const img1 = await page.getByRole('img').nth(0)
  const txtCont1 = await txt1.textContent()
  const imgSrc1 = await img1.getAttribute('src')

  await page.click('button')

  const txt2 = await page.getByRole('paragraph')
  const img2 = await page.getByRole('img').nth(0)
  const txtCont2 = await txt2.textContent()
  const imgSrc2 = await img2.getAttribute('src')

  const ctrlV = (txtCont1 === txtCont2 && imgSrc1 === imgSrc2)

  // Este es directamente un valor boleano
  await expect(ctrlV).toBeTruthy
})

/*
Otra forma de hacer el test de los componentes al dar click en el boton de actualizar.

test('app changes fact and image', async ({ page }) => {
  // 1. Abrir la página de la app
  await page.goto(LOCALHOST_URL);

  // 2. Localizadores iniciales
  const txt = page.locator('p').first();     // primer párrafo
  const img = page.locator('img').first();   // primera imagen
  const btn = page.locator('button');

  // 3. Guardar valores iniciales
  const txtInicial = await txt.textContent();
  const imgInicial = await img.getAttribute('src');

  // 4. Hacer clic en el botón
  await btn.click();

  // 5. Verificar que el texto cambió
  await expect(txt).not.toHaveText(txtInicial);

  // 6. Verificar que la imagen cambió
  await expect(img).not.toHaveAttribute('src', imgInicial);
});
*/
