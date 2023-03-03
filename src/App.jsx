import { Paper, TextField, Container, Typography, Autocomplete, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    contactTitle: '',
    country: '',
    city: ''
  })
  const [companyNameErr, setCompanyNameErr] = useState({ status: false, msg: '' })
  const [contactNameErr, setContactNameErr] = useState({ status: false, msg: '' })
  const [contactTitleErr, setContactTitleErr] = useState({ status: false, msg: '' })
  let validationInstant = {}
  const [errorList, setErrorList] = useState({ r1: false, r2: false, r3: false })
  const [postStatus, setPostStatus] = useState('')
  const regExp = new RegExp(/[A-Z]/)

  const countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
  const cityList = ['Baku', 'Sumgait', 'Ganja', 'Nahchivan', 'Guba', 'Shaki', 'Gabala', 'Khizi', 'Zagatala', 'Khankandi']



  //OnChange Handle
  const formHandle = (e) => {
    validationInstant = { [e.target.name]: e.target.value }
    setFormData({ ...formData, ...validationInstant })
    // Validation instantly
    validateInstant(formData)
  }

  //Form Submit
  const formSubmit = (e) => {
    e.preventDefault()
    //Submit
    if (!errorList.r1 && !errorList.r2 && !errorList.r3) {
      setPostStatus('pending')
      fetch("https://northwind.vercel.app/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactName: formData.contactName,
          contactTitle: formData.contactTitle,
          address: {
            city: formData.city,
            country: formData.country
          }
        }),
      }).finally(()=>setPostStatus('fulfilled'))
    }
  }

  const validateInstant = (e) => {
    if (e.companyName && e.companyName.length < 5) { setErrorList({ ...errorList, r1: true }); setCompanyNameErr(() => ({ ...companyNameErr, status: true, msg: 'min. length 5' })) } else { setErrorList({ ...errorList, r1: false }); setCompanyNameErr(() => ({ ...companyNameErr, status: false, msg: '' })) }
    if (e.contactName && e.contactName.includes('@')) { setErrorList({ ...errorList, r2: true }); setContactNameErr(() => ({ ...contactNameErr, status: true, msg: 'don\'t use "@"' })) } else { setErrorList({ ...errorList, r2: false }); setContactNameErr(() => ({ ...contactNameErr, status: false, msg: '' })) }
    if (e.contactTitle && !regExp.test(e.contactTitle[0])) { setErrorList({ ...errorList, r3: true }); setContactTitleErr(() => ({ ...contactTitleErr, status: true, msg: 'first letter must be uppercase' })) } else { setErrorList({ ...errorList, r3: false }); setContactTitleErr(() => ({ ...contactTitleErr, status: false, msg: '' })) }
  }

  const inputStyle = {
    width: '100%',
    marginBottom: '30px'
  }
  return (
    <Container sx={{ marginTop: '50px' }}>
      <Paper elevation={3} sx={{ padding: 3, maxWidth: '400px', marginInline: 'auto' }} >
        <form onSubmit={(e) => formSubmit(e)}>
          <Typography sx={{ textAlign: 'center', marginBottom: '20px' }} variant="h3" color="initial">Suppliers From</Typography>
          <TextField name='companyName' sx={{ ...inputStyle }} onChange={(e) => formHandle(e)} label="Company Name" variant="outlined" value={formData.companyName} error={companyNameErr.status} helperText={companyNameErr.msg} />
          <TextField name='contactName' sx={{ ...inputStyle }} onChange={(e) => formHandle(e)} label="Contact Name" variant="outlined" value={formData.contactName} error={contactNameErr.status} helperText={contactNameErr.msg} />
          <TextField name='contactTitle' sx={{ ...inputStyle }} onChange={(e) => formHandle(e)} label="Contact Title" variant="outlined" value={formData.contactTitle} error={contactTitleErr.status} helperText={contactTitleErr.msg} />
          <Autocomplete
            disablePortal
            options={countryList}
            sx={{ ...inputStyle }}
            renderInput={(params) => <TextField {...params} name='country' onSelect={(e) => formHandle(e)} label="Country" value={formData.country} required />}
          />
          <Autocomplete
            disablePortal
            options={cityList}
            sx={{ ...inputStyle }}
            renderInput={(params) => <TextField {...params} name='city' onSelect={(e) => formHandle(e)} label="City" value={formData.city} required />}
          />
          <Button type='submit' disabled={postStatus==='fulfilled'} sx={{ width: '100%', height:'50px' }} variant="contained">{postStatus?(postStatus==='pending'?<CircularProgress sx={{width:'100%'}} />:'Supplier added'):('ADD SUPPLIER')}</Button>
        </form>
      </Paper>
    </Container>
  )
}
