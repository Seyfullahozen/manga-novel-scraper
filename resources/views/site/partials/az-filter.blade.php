@php
    $azType = $azType ?? 'novel';
@endphp

<div class="dlab-alfabe-div">
    <div id="dlab-alfabe">
        <div class="dlab-alfabe-harfler">
            @php $letters = array_merge(['#'], range('A', 'Z')); @endphp
            @foreach($letters as $L)
                <a href="#{{ $L === '#' ? 'first' : $L }}"
                   class="dlab-alfabe-link"
                   title="{{ $L }}">{{ $L }}</a>
            @endforeach
        </div>
    </div>

    @foreach($letters as $L)
        @php
            $dataIndex = $L === '#' ? '#first' : ('#' . $L);
            $items     = $azGroups[$L] ?? [];
        @endphp

        <ul class="dlab-alfabe-liste" data-index="{{ $dataIndex }}">
            @forelse($items as $item)
                @php
                    if ($azType === 'mixed') {
                        $model     = $item['_model'];
                        $itemType  = $item['_type'];
                        $itemRoute = $itemType === 'novel'
                            ? route('site.novel.show', $model)
                            : route('site.manga.show', $model);
                    } else {
                        $model     = $item;
                        $itemType  = $azType;
                        $itemRoute = $azType === 'novel'
                            ? route('site.novel.show', $model)
                            : route('site.manga.show', $model);
                    }
                    $displayTitle = \Illuminate\Support\Str::limit($model->title, 25);
                @endphp
                <li>
                    <a title="{{ e($model->title) }}" href="{{ $itemRoute }}">
                        <img src="{{ asset('assets/icons/angles-right-solid-full.svg') }}"
                             alt="" style="width:100%;height:100%;max-width:16px;flex-shrink:0;">
                        <span class="az-item-title">{{ $displayTitle }}</span>
                        @if($azType === 'mixed')
                            <span class="az-type-badge az-type-badge--{{ $itemType }}">
                                {{ $itemType === 'novel' ? 'N' : 'M' }}
                            </span>
                        @endif
                    </a>
                </li>
            @empty
            @endforelse
        </ul>
    @endforeach
</div>
