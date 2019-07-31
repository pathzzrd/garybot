import markovify
import sys

strconvo  = sys.argv[1]


# Get raw text as string.
with open("/gary/jons_brain/general_jon") as f:
    text = f.read()

with open("/gary/jons_brain/inout_model") as e:
    input_text = e.read()
# Build the model.
text_model = markovify.NewlineText(text, state_size=3)
input_model = markovify.NewlineText(input_text, state_size=3)
# Print five randomly-generated sentences

conversation = markovify.NewlineText(strconvo, state_size=3)

model_combo = markovify.combine([ input_model, text_model, conversation ], [ 1, 1.5, 5 ])
for i in range(8):
    print(model_combo.make_sentence())


# Print three randomly-generated sentences of no more than 140 characters
#for i in range(3):
#    print(model_combo.make_short_sentence(140))
