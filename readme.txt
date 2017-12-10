- no need to stop listener, at this time
- my need, when muliple listeners are there

https://stackoverflow.com/questions/11788902/firebase-child-added-only-get-child-added

To track things added since some checkpoint without fetching previous records, you can use endAt() and limit() to grab the last record:

// retrieve the last record from `ref`
ref.endAt().limit(1).on('child_added', function(snapshot) {

   // all records after the last continue to invoke this function
   console.log(snapshot.name(), snapshot.val());

});


limit() method is deprecated. limitToLast() and limitToFirst() methods replace it.

// retrieve the last record from `ref`
ref.limitToLast(1).on('child_added', function(snapshot) {

   // all records after the last continue to invoke this function
   console.log(snapshot.name(), snapshot.val());
   // get the last inserted key
   console.log(snapshot.key());

});


 0
down vote
	

I tried other answers way but invoked at least once for last child. If you have a time key in your data, you can do this way.

ref.orderByChild('createdAt').startAt(Date.now()).on('child_added', .
