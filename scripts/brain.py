import markovify
import sys

strconvo = sys.argv[1]

politicalFlag = ""

if len(sys.argv) > 2:
    politicalFlag = sys.argv[2]


mainBrain = "/gary/jons_brain/general_jon"
seedBrain = "/gary/jons_brain/inout_model"

if politicalFlag == "on":
    mainBrain = "/gary/jons_brain/political_jon"
    seedBrain = "/gary/jons_brain/political_inout"


# Get raw text as string.
with open(mainBrain) as f:
    text = f.read()

with open(seedBrain) as e:
    input_text = e.read()
# Build the model.
text_model = markovify.NewlineText(text, state_size=3)
input_model = markovify.NewlineText(input_text, state_size=3)
# Print five randomly-generated sentences

conversation = markovify.NewlineText(strconvo, state_size=3)

model_combo = markovify.combine([ input_model, text_model, conversation ], [ 1, 1.5, 5 ])
for i in range(8):
    sentence =model_combo.make_sentence()
    if sentence != None:
        print(sentence)


# Print three randomly-generated sentences of no more than 140 characters
#for i in range(3):
#    print(model_combo.make_short_sentence(140))
