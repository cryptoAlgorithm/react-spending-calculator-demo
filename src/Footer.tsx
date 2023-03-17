import {Button, Container, Divider, Sheet, Typography, useColorScheme} from '@mui/joy'

const Footer = () => {
  const { mode, setMode } = useColorScheme();

  return <Sheet sx={{mt: 3}}>
    <Divider />
    <Container sx={{py: 2}}>
      <Typography level={'h6'}>Spending Calculator</Typography>
      <Typography level={'body2'} mb={1.5}>Another demo made with ❤️ by Vincent</Typography>
      <Button
        variant={'outlined'} color={'neutral'}
        size={'sm'}
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        {mode === 'dark' ? 'Turn the lights on' : 'Turn the moon on'}
      </Button>
    </Container>
  </Sheet>
}

export default Footer