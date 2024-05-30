fetch('http://43.204.67.248:4003/graphql', {
  method: 'POST',


  headers: {
    "Content-Type": "application/json",
    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwiZW1haWwiOiJtaXNmZXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAyODc2NzkwLCJleHAiOjE3MDM3NDA3OTB9.QLIkebQ6x8C4rC-UIQm4maGwC1cBjWxr3dQygAiS8I4"
  },


  body: JSON.stringify({
    query: `{
        SlotsByStoreId(storeId: 1235) {
        id
        date
        timeSlots
        slotStatus
        storeId

      }
    }`
  })
})
  .then(res => console.log(res?.status))
 