import React, {Fragment, useState} from 'react'
import {
  Button,
  Container, FormControl, FormLabel, Input,
  List,
  ListDivider,
  ListItem,
  ListItemButton, ListItemContent,
  ListItemDecorator,
  Modal, ModalClose,
  ModalDialog, Stack, TextField,
  Typography
} from '@mui/joy'
import Footer from './Footer'

interface SpendItem {
  name: string
  percentage: number
}

function App() {
  const
    [spendItems, setSpendItems] = useState<SpendItem[]>([]),
    [addItemOpen, setAddItemOpen] = useState(false),
    [newItemProp, setNewItemProp] = useState(0),
    [newItemName, setNewItemName] = useState(''),
    [totalIncome, setTotalIncome] = useState(0);

  return <>
    <Container>
      <Typography level={'h2'} my={2}>Spending Calculator</Typography>

      <FormControl>
        <FormLabel>Monthly Income</FormLabel>
        <Input
          value={totalIncome.toString()}
          onChange={(e) => {
            if (e.target.value.length === 0) setTotalIncome(0);
            const v = parseFloat(e.target.value)
            v && setTotalIncome(v)
          }}
          startDecorator={<>
            <Button onClick={() => setTotalIncome(i => Math.max(i - 100, 0))}>&#8722;</Button>
            <Typography ml={1} color={'neutral'}>$</Typography>
          </>}
          endDecorator={<Button onClick={() => setTotalIncome(i => i + 100)}>&#43;</Button>}
          type={'number'} slotProps={{ input: { min: 0 }}}
        />
      </FormControl>

      { /* This demonstrates the power of reactive UI */ }
      <List variant={'soft'} sx={{borderRadius: 'sm', mt: 2}}>
        { spendItems.map((item, idx) => <Fragment key={item.name + item.percentage + idx}>
          <ListItem>
            <ListItemContent>
              <Typography level={'h6'}>{item.name}</Typography>
              <Typography level={'body2'}>
                ${totalIncome.toFixed(2)} &times; {item.percentage}% = ${(totalIncome*item.percentage/100).toFixed(2)}
              </Typography>
            </ListItemContent>
            <ListItemDecorator>
              <Button
                variant={'soft'} color={'danger'}
                onClick={() =>
                  setSpendItems(items => ([...items.slice(0, idx), ...items.slice(idx + 1)]))
                }
              >
                Remove
              </Button>
            </ListItemDecorator>
          </ListItem>
          <ListDivider />
        </Fragment>)}
        { /*
         A trick to conditionally render an element - when the condition is false,
         the element(s) are fully _removed_ from the DOM, not just hidden.
         */ }
        { spendItems.length === 0 && <> { /* These "empty HTML tags" are actually React Fragments */ }
          <ListItem sx={{color: 'text.secondary'}}>No items</ListItem>
          <ListDivider />
        </>}
        <ListItem>
          <ListItemButton onClick={() => setAddItemOpen(true)}>
            Add Item
          </ListItemButton>
        </ListItem>
      </List>
    </Container>

    <Modal open={addItemOpen} onClose={() => setAddItemOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <Stack gap={1}>
          <Typography level={'h4'}>Add a Spending</Typography>
          <Input placeholder="Title" value={newItemName} onChange={e => setNewItemName(e.target.value)} />
          <Input placeholder="Expense Percentage"
                 value={newItemProp.toString()}
                 onChange={(e) => {
                   if (e.target.value.length === 0) setNewItemProp(0);
                   const v = parseInt(e.target.value)
                   v && v <= 100 && setNewItemProp(v)
                 }}
                 endDecorator={'%'} type={'number'} slotProps={{ input: { min: 0, max: 100 }}}
          />
          <Button
            disabled={newItemName.length === 0 || newItemProp === 0}
            onClick={() => {
              setSpendItems([...spendItems, { name: newItemName, percentage: newItemProp }])
              setAddItemOpen(false)
              setNewItemName('')
              setNewItemProp(0);
            }}>
            Add
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>

    <Footer />
  </>
}

export default App;
