import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore.ts'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants.ts'
import { ArrowIcons, ClipboardIcon, SpeakerIcon } from './components/Icons.tsx'
import { LanguageSelector } from './components/LanguageSelector.tsx'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea.tsx'
import { useEffect } from 'react'
import { translate } from './services/translate.ts'
import { useDebounce } from './hooks/useDebounce.ts'

// 3. Usar el hook useReducer
function App () {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 200)

  useEffect(() => {
    if (fromText === '') return
    translate({ fromLanguage, toLanguage, text: fromText })
    .then((result) => {
      // En Ts el comparador '==' compara si es null o undefined
      if (result == null) return
      setResult(result)
    })
    .catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(()=>{})
  }

  const handleSpeak = () => {
    // Web Speech API
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2>Google Translate</h2>
      <Row>
        <Col>
         <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              loading={loading}
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            ></TextArea>
         </Stack>
        </Col>

        <Col xs='auto'>
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowIcons></ArrowIcons>
          </Button>
        </Col>

        {/* Nota: Los errores de typescript deben leerse de abajo hacia arriba. */}
        <Col>
          <Stack gap={2}>
            <LanguageSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              ></TextArea>
            </div>
            <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
              <Button
                variant='link'
                onClick={handleClipboard}>
                  <ClipboardIcon />
              </Button>
              <Button
                variant='link'
                onClick={handleSpeak}>
                  <SpeakerIcon />
              </Button>
            </div>
          </Stack>
        </Col>

      </Row>
    </Container>
  )
}

export default App
