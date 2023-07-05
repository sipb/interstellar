#!/bin/bash
npm run build && scp client/dist/bundle.js interstellar@interstellar.xvm.mit.edu:~/interstellar/client/dist/bundle.js
