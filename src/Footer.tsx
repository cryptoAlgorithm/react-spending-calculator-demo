import {Button, Container, Divider, Sheet, Stack, Typography, useColorScheme} from '@mui/joy'

const Footer = () => {
  const { mode, setMode } = useColorScheme();

  return <Sheet sx={{mt: 3}}>
    <Divider />
    <Container sx={{py: 2}}>
      <Typography level={'h6'}>Spending Calculator</Typography>
      <Typography level={'body2'} mb={1.5}>Another demo made with ❤️ by Vincent</Typography>
      <Stack direction={'row'} spacing={2}>
        <Button
          variant={'outlined'} color={'neutral'} size={'sm'}
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
          {mode === 'dark' ? 'Turn the lights on' : 'Turn the moon on'}
        </Button>
        <Button
          size={'sm'} variant={'outlined'}
          target={'_blank'}
          component={'a'} href={'https://github.com/cryptoAlgorithm/react-spending-calculator-demo/'}
        >
          View Source on GitHub
        </Button>
      </Stack>
    </Container>
  </Sheet>
}

export default Footer